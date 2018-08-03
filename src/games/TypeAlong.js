import React, { Component } from 'react';
import DataService from '../services/Data';

class TypeAlong extends Component {
    ds = new DataService();
    pressSpace=false;
    constructor(props){
        super(props);
        let first = this.ds.chooseCharacter();
        this.state = {
            currentCharacter: first,
            currentLetter:"",
            currentIndex: 0,
            typing: [],
            showSpace: false
        }
     }

     componentDidMount(){
         this.setState({currentLetter: this.state.currentCharacter.name[0]});
     }

     keypress(e) {
         if(!this.state.showSpace) {
            if(this.state.currentLetter.toLocaleLowerCase() === e.key.toLocaleLowerCase()) {
                let newTyping = this.state.typing.slice(0);
                newTyping.push(e.key);
                let newIndex = this.state.currentIndex + 1;
                let nextLetter = this.state.currentCharacter.name[newIndex];
                if(nextLetter === " ") {
                    newIndex = newIndex + 1;
                    nextLetter = this.state.currentCharacter.name[newIndex];
                    newTyping.push(" ");
                }
                if(!nextLetter) {
                    this.setState({
                        showSpace: true,
                        typing : newTyping,
                        currentIndex: newIndex
                    })
                } else {
                    this.setState({
                        typing : newTyping,
                        currentLetter : nextLetter,
                        currentIndex: newIndex,
                    });
                }
             }
         } else {
            if(e.key == " ") {
                let first = this.ds.chooseCharacter();
                        let name = first.name;
                        this.setState({
                            typing: [],
                            currentIndex: 0,
                            currentCharacter: first,
                            currentLetter: name[0],
                            showSpace: false
                        }); 
                }
         }
         
     }

     render() {
         let list;
         let img;
         if(this.state.currentCharacter) {
            list = (this.state.currentCharacter.name)
                        .split("")
                        .map((item, inx) => {
                            if(item === " ") {
                                return <p key={inx} className="line"></p>
                            }
                            if(this.state.typing[inx]) {
                                return <p key={inx} className="line">{this.state.typing[inx].toUpperCase()}</p>
                            }
                            return <p key={inx} className="line">_</p>
                        });
            let style= {
                opacity: this.state.currentIndex * 10 * this.state.currentIndex/ (this.state.currentCharacter.name.length  * 100)
            }
            img = <img src={this.state.currentCharacter.img} style={style}/>
         }
         let message;
         if(this.state.showSpace) {
            message = <p>{'Press the space bar for the next character!'}</p>;
            let style = {
                opacity: 100
            };
            img = <img src={this.state.currentCharacter.img} style={style}/>
         } else {
            message = <p>{`Type the letter \'${this.state.currentLetter.toLocaleUpperCase()}\'`}</p>
         }
         return (
             <div tabIndex="0" onKeyDown={(e) => this.keypress(e)}>
                <div>
                    { img }
                    { message }
                </div>
                <div>
                    { list }
                </div>
             </div>
         )
     }
}

export default TypeAlong;