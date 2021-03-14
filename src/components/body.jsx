import React from 'react'
import { Markup } from 'react-render-markup';
import GithubPng from '../styles/img/github-new.png'
import TwitterPng from '../styles/img/twitter-new.png'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import HeartPng from '../styles/img/emoji/heart.png'
import LightPng from '../styles/img/emoji/light.png'
import MoneyPng from '../styles/img/emoji/money.png'
import TDownPng from '../styles/img/emoji/thumbs-down.png'


export default class Body extends React.Component {

    componentDidMount(){
        this.CreateReactions();
    }

    /** 
     * 
     * 
     *    Functional components
     * 
     * 
    **/

    Profile = (props) =>{
        return <>
            <a href={`https://hackernoons/u/${props.handle}`}>
                <img className="shadow" width="50" height="50" src={props.avatar} alt=""/>
            </a>
            <div>
                <a href={`https://hackernoons/u/${props.handle}`}>@{props.handle}</a> <br/>
                <small><b>{props.displayName}</b></small>
                <p>{props.bio}</p>
                <div className="profile-social">
                    <a href={`https://twitter.com/${props.twitter}`}>
                        <img src={TwitterPng} alt="twitter_link"/>
                    </a>
                    <a href={`https://github.com/${props.github}`}>
                        <img src={GithubPng} alt="github_link"/>
                    </a>
                </div>
           </div>
        </>
    }
     
    
    PostDetails = (props) =>{
        let options = {  month: 'long', day: 'numeric', year: 'numeric'};
        const date = new Date(props.publishedAt*1000);
        const month = date.toLocaleString('en-US', {month:"long"});
        const year = date.getFullYear();
        const day = this.Nth(date.toLocaleString('en-US', {day:"numeric"}));
    
        const published = month + " " + day + " " + year;  
        
        return <div className="post-detail">
                    <div className="p-detail-1">
                        <a href="/">{published}</a>
                        <span className="read-time">
                            <FontAwesomeIcon height="18" icon={faStar} />
                             {" "+ props.estimatedTime} minutes read
                        </span>
                        <button className="btn-bookmark"><FontAwesomeIcon icon={faBookmark} /></button> 
                    </div>
                    <div className="p-detail-2">
                       {this.Reactions(true, this.props.reactions)}
                    </div>
                </div>
    }

    RelatedCard = (props) =>{
        
        let date = "";
        if (props.publishedAt){
            date = new Date(props.publishedAt*1000).toLocaleDateString("en-US");
        }
        console.log(props.publishedAt);
        return  <div className="related-card" id={props.id?props.id:""} >
                   {props.title && <>
                        <h2 className="related-title"><a href={"https://hackernoon.com/"+props.slug} > {props.title} </a></h2>
                        <div className="related-reactions">
                            <span>{props.reactionsCount + ((props.reactionsCount>0)? " reactions":" reaction")}</span>
                        </div>
                        <div className="related-img">
                            <a href={"https://hackernoon.com/"+props.slug}> <img src={props.mainImage} alt=""/> </a>
                            <div className="related-tag">
                                <a className="tag shadow" href="/">
                                    #{props.tags[0]}
                                </a>
                            </div>
                        </div>
                        <div className="related-details">
                            <div className="profile grid-1">
                                <a href={`https://hackernoons/u/${props.profile.handle}`}>
                                    <img className="shadow" width="50" height="50" src={props.profile.avatar} alt=""/>
                                </a>
                                <div>
                                    <a href={`https://hackernoons/u/${props.profile.handle}`}>@{props.profile.handle}</a> <br/>
                                    <small><b>{props.profile.displayName}</b></small>
                                </div>
                            </div>
                            <div className="time">
                                <p>{props.estimatedTime? props.estimatedTime+"min":""}</p>
                                <p>{date}</p>
                            </div>
                        </div>
                    </>
                    }
                </div>
    }


    Reactions = (props, reactions) =>{
        return  <>
                    {props && <span className="detail-title">{reactions.total}</span>}
                    <div className={props===true ? "detail-emoji":"detail-emoji-small hidden"}>
                        <img className="emoji" src={HeartPng} alt=""/>
                        <img className="emoji" src={LightPng} alt=""/>
                        <img className="emoji" src={TDownPng} alt=""/>
                        <img className="emoji" src={MoneyPng} alt=""/>
                    </div>
                </>
    }


    /** 
     * 
     * 
     *    Additional functions
     * 
     * 
    **/


    InsertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
    
    Nth = function(d) {
        if (d > 3 && d < 21) return d+'th';
            switch (d % 10) {
            case 1:  return d+"st";
            case 2:  return d+"nd";
            case 3:  return d+"rd";
            default: return d+"th";
        }
    }
    
    CreateReactions(props){
        const paragraph = document.getElementsByClassName("paragraph");
        for (let i=0; i<paragraph.length; i++){
            paragraph[i].id = "paragraph-"+i;
            const reactions = this.Reactions(false, this.props.reactions);
            const div = document.createElement('div');
            div.className = "bar-reaction";
            div.id = "bar-reaction"+i;
            this.InsertAfter(paragraph[i], div);
            const div2 =  <>
                            <div className="bar" id={"bar"+i}></div>
                            {reactions}
                        </>;
            ReactDOM.render(div2, div);
        }
    }


    render() {
        const {markup, mainImage, profile, title, reactions, publishedAt, estimatedTime, relatedStories, tags} = this.props;
        return  <main className="main">
                    <div className="container">
                        <h1 className="mainTitle">{title}</h1>
                        {this.PostDetails({reactions, publishedAt, estimatedTime})}
                        <div className="image-container">
                            <img src={mainImage} alt=""/>
                        </div>
                        <div className="profile grid-2">
                            {this.Profile({...profile})}
                        </div>
                        <Markup markup={markup}/>
                        <div className="footer-reactions">
                            {this.Reactions(true, this.props.reactions)}
                        </div>

                        <div className="section grid-column-1">
                            <h4 className="title divider">Related</h4>
                            <div className="related-list">
                                {relatedStories.map((post, i)=>(
                                    this.RelatedCard(post)
                                ))}
                            </div>
                        </div>
                        <div className="section grid-column-2">
                            <h4 className="title divider">Tags</h4>
                            <div className="tags-list">
                               {tags.map((id)=>(
                                   <a className="tag shadow" href={"https://hackernoon.com/tagged/"+id}>#{id}</a>
                               ))}
                            </div>
                        </div>
                        

                    </div>
                </main>
    }
}

