import React, {Component} from 'react';
//https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js
//$("body").append($("<script src="https://forio.com/tools/js-libs/1.5.0/epicenter.min.js"></script>"))
const marked = t=>t;

class MarkdownText extends Component{
	
	constructor(props){
		super(props);		
		this.state = {
			text: ''
		}

		this._handleChange = this._handleChange.bind(this);
    	this.markText = this.markText.bind(this);
	}

	_handleChange(){
		const text = this.refs.textInput.value;		
		this.setState({ text: text });
	}
  
	markText(value){
	const markedText = marked(value);
	return { __html: markedText };
	}

	render(){				
		return(			
			<div>		
		        <h3>Markdown Previewer</h3>
		        <hr/><br/>
		        <div className='mark-container'>
		          <div className='one'>
		            <textarea onChange={this._handleChange} 
		              rows="15" cols="40"
		              ref='textInput' 
		              placeholder='Type here' 
		              autoFocus  />
		          </div>        
		          <div className='two' 
		            dangerouslySetInnerHTML={this.markText(this.state.text)}>          	
		          </div>	
	        	</div>
			</div>
		);
	}
};
 
 
export default MarkdownText; 

//css

// .mark-container {
//     display: flex;
// }
// .one {
//     flex: 0 0 40%;    
// }
// .two {
//     flex: 0.7; 
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     overflow-y: scroll;
// }
