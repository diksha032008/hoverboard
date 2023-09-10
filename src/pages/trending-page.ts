import { customElement, property } from "@polymer/decorators";
import { PolymerElement } from "@polymer/polymer";
import { html } from "@polymer/polymer";
import { ReduxMixin } from "../store/mixin";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { type } from "os";


type trendingType = {
    url:string,
    title:string,
    description: string,
    speakers:string,
    avgStyle:number,
    avgContent:number,
    totalReviews:number,
    overallScore:number,
    hasSpeakers: boolean
  }


@customElement('trending-page')
export class TrendingPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
    .items-box{
        border-radius: 2px;
        border-color: bisque;
        width: 70%;
        margin-left: 14%;
        
    }

    .items-box p{
       
        padding: 0 5%;
       
       
    }

    .items-box a{
        text-decoration:none;
        display:block;
        color:black;
    }

    .item-box{
        display: flex;
        justify-content: space-between;
        margin-bottom:20px;
        background-color:aliceblue;
        border-radius:10px;
    }

    .item-box:hover{
        cursor: pointer;
    }

    .session-overview{
        width:100%;
        margin:12px;
    }

    .session-overview p{
        padding:0 8px;
       
    }

    .session-title{
        font-size: 50%;
        font-weight: 600;
    }

   
     .session-ratings-info p{
        min-width:400px;
        font-size: 50%;
        font-weight: 600;
        /* Add ellipsis for overflow text */

    }

    .session-ratings-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right:16px;
        min-width:300px;
    }

    .ratings{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;
        margin-top: 8px;
        margin-left:16px;
      }

    .session-description{
        font-size: 50%;
        font-weight: 400;
        overflow: hidden;            /* Hide overflow text */
        text-overflow: ellipsis;  
        display: -webkit-box;
        -webkit-box-orient: vertical;
        width: 700px;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        max-height: 100px;
    }

    @media (max-width:600px) {
        .session-description{
            width: 95%;
        }
        .item-box{
            flex-direction: column;
           
        }

        .items-box{
            margin-left: 0;
            width: 100%;
           
        }

        .container{
            margin: 0 3%;
        }
        .ratings{
            margin-top:4px;
            margin-bottom:0;
            margin-left:8px;
        }

        .session-overview{
            margin:8px 0 0 0;
        }

        .session-overview p{
            padding:0 8px;
            margin:4px 0;
        }

        .all-reviews{
            padding-bottom:8px;
        }

        .speakers p{
            margin:8px 0 8px 0;
        }

    }


    .item-box .speakers{
       font-weight: 400;
        font-size: 50%;
    }

    .Stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: 24px;
        font-family: Times;
        line-height: 1;
        margin-left:8px;
      }
      .Stars::before {
        content: "★★★★★";
        letter-spacing: 3px;
        background: linear-gradient(90deg, #fc0 var(--percent), #fff var(--percent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

     

      .speakers-title{
        font-weight:400;

      }

      .speakers{
        display:flex;
        alig-items:baseline;
      }
</style>
<simple-hero page="trending"></simple-hero>
<div class="container">
<h1 class="title">
    <div class="items-box"><!--Holding all the items as we get as array-->
        <template is="dom-repeat" items="[[myArr]]">
        <a href="{{item.url}}">
            <div class="item-box">
                    <div class="session-overview">
                        <p class="session-title">
                            {{item.title}}
                        </p>
                        <div class="speakers">
                        <template is="dom-if" if="[[item.hasSpeakers]]">
                            <p class="speakers-title" "> Presented By: </p>
                               
                                <p class="speaker">{{item.speakers}}</p>
                               
                            </template>
                        </div>
                    </div>
                    <div class="session-ratings-info">
                        <div class="ratings">
                            Overall Ratings: <span style="margin-left:4px;">{{item.overallScore}}</span>
                            <div class="Stars" style$="--rating: {{item.overallScore}}"></div>
                        </div>
                        <div class="all-reviews ratings">Total reviews: <span style="margin-left:4px;">{{item.totalReviews}}</span></div>
                    </div>
            </div>
        </a>
        </template>
    </div>
</h1>
</div>`}

override connectedCallback() {
    super.connectedCallback();
    
  }

    @property({type:Array})
   // get info for the avg stars rating.
   private  myArr:trendingType[]=[];


   private getAvgCount =async ():Promise<trendingType[]>=> {

    let currArr:trendingType[]=[];
     const items = await getDocs(collection(db, "sessions"));
    
     
     items.forEach(async (item)=>{
       const gettingFeedbacks = await getDocs(collection(db, "sessions",item.id,"feedback"));
       const title  = item.data()['title']
       const description = item.data()['description']
       let size=0;
       let countStyleRating =0;
       let countContentRating =0;
       
       
       
       let speakersName=this.changeSpeakerLinkToName(item.data()['speakers']);
       gettingFeedbacks.docs.map(d=>{
         countStyleRating += d.data()['styleRating'];
         countContentRating += d.data()['contentRating'];
         size++;
       })
       if(size===0){
        
         
        currArr.push({
           url:`/sessions/${item.id}`,
           title,
           description,
           avgContent:0,
           avgStyle:0,
           overallScore:0,
           totalReviews:0,
           speakers:speakersName,
           hasSpeakers:speakersName.length!==0
         })
     
       }else{
         
 
         currArr.push({
           url:`/sessions/${item.id}`,
           title,
           description,
           avgContent:(countContentRating/size),
           avgStyle:(countStyleRating/size),
           overallScore:((countContentRating+countStyleRating)/(2*size)),
           totalReviews:size,
           speakers:speakersName,
           hasSpeakers:speakersName.length!==0
         })
       
       }

     })
   currArr.sort((a,b)=>b.totalReviews-a.totalReviews)
   
   return currArr;
   }

   override  async ready(){
    super.ready()
    let getData = await this.getAvgCount();    
    await this.fetchData()
    this.myArr = getData;
    this.myArr.sort((a,b)=>b.overallScore-a.overallScore);

  }

  private capitalizeString(str:string) {
    // Split the string into an array of words
    const words = str.split(' ');
  
    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the capitalized words back into a single string
    return capitalizedWords.join(' ');
  }

  private changeSpeakerLinkToName(speakersUrl?:string[]):string{
    let changedStrings:string[]=[];
    speakersUrl?speakersUrl.forEach((speakerUrl)=>{
        let currString = this.capitalizeString(speakerUrl.split("_").join(" "));        
        changedStrings.push(currString)
    }):[];
    return changedStrings.join(", ");
  }

  private async fetchData() {
    // Using this functin as a time buff to load the data before rendering begins on html.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data fetched successfully");
      }, 500);
    });
  }
 




  }