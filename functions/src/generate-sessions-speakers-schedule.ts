// https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { logger } from 'firebase-functions/v2';
import { sessionsSpeakersMap } from './schedule-generator/speakers-sessions-map.js';
import { sessionsSpeakersScheduleMap } from './schedule-generator/speakers-sessions-schedule-map.js';
import { DEPLOY_REGION, isEmpty, ScheduleMap, SessionMap, snapshotToObject, SpeakerMap } from './utils.js';

import { setGlobalOptions } from 'firebase-functions/v2';
setGlobalOptions({ region: DEPLOY_REGION });

const isScheduleEnabled = async (): Promise<boolean> => {
  const doc = await getFirestore().collection('config').doc('schedule').get();

  if (doc.exists) {
    return doc.data().enabled === 'true' || doc.data().enabled === true;
  } else {
    logger.error(
      'Schedule config is not set. Set the `config/schedule.enabled=true` Firestore value.'
    );
    return false;
  }
};

export const sessionsWrite = onDocumentWritten ('sessions/{sessionId}', () => generateAndSaveData());

export const scheduleWrite = onDocumentWritten('schedule/{scheduleId}', async () => {
    if (await isScheduleEnabled()) {
      return generateAndSaveData();
    }
    return null;
  });

export const speakersWrite = onDocumentWritten('speakers/{speakerId}', async (change) => {
    const changedSpeaker = change.data.after.exists
      ? { id: change.params.speakerId, ...change.data.after.data() }
      : null;
    return generateAndSaveData(changedSpeaker);
  });

const fetchData = () => {
  const sessionsPromise = getFirestore().collection('sessions').get();
  const schedulePromise = getFirestore().collection('schedule').orderBy('date', 'desc').get();
  const speakersPromise = getFirestore().collection('speakers').get();

  return Promise.all([sessionsPromise, schedulePromise, speakersPromise]);
};

async function generateAndSaveData(changedSpeaker?) {
  const [sessionsSnapshot, scheduleSnapshot, speakersSnapshot] = await fetchData();

  const sessions = snapshotToObject(sessionsSnapshot);
  const schedule = snapshotToObject(scheduleSnapshot);
  const speakers = snapshotToObject(speakersSnapshot);

  let generatedData: {
    sessions?: {};
    speakers?: {};
    schedule?: {};
  } = {};
  if (!Object.keys(sessions).length) {
    generatedData.speakers = { ...speakers };
  } else if (!(await isScheduleEnabled()) || !Object.keys(schedule).length) {
    generatedData = sessionsSpeakersMap(sessions, speakers);
  } else {
    generatedData = sessionsSpeakersScheduleMap(sessions, speakers, schedule);
  }

  // If changed speaker does not have assigned session(s) yet
  if (changedSpeaker && !generatedData.speakers[changedSpeaker.id]) {
    generatedData.speakers[changedSpeaker.id] = changedSpeaker;
  }

  saveGeneratedData(generatedData.sessions, 'generatedSessions');
  saveGeneratedData(generatedData.speakers, 'generatedSpeakers');
  saveGeneratedData(generatedData.schedule, 'generatedSchedule');
}

function saveGeneratedData(data: SessionMap | SpeakerMap | ScheduleMap, collectionName: string) {
  if (isEmpty(data)) {
    logger.error(
      `Attempting to write empty data to Firestore collection: "${collectionName}".`
    );
    return;
  }

  for (let index = 0; index < Object.keys(data).length; index++) {
    const key = Object.keys(data)[index];
    getFirestore().collection(collectionName).doc(key).set(data[key]);
  }
}
