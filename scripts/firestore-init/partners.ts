import { firestore } from '../firebase-config';
import data from '../../docs/default-firebase-data.json';

export const importPartners = () => {
  const partners = {};
  if (!Object.keys(partners).length) {
    return Promise.resolve();
  }
  console.log('Importing partners...');

  const batch = firestore.batch();

  Object.keys(partners).forEach((partnerId) => {
    const partner = {};
    if (partner) {
      batch.set(firestore.collection('partners').doc(partnerId), {
        title: "",
        order:"",
      });
    } else {
      console.warn(`Missing partner ${partnerId}`);
    }
  });

  return batch.commit().then((results) => {
    console.log('Imported data for', results.length, 'documents');
  });
};
