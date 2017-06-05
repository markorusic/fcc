import React, {Component} from 'react';
import axios from 'axios';

const api = {
	fetchLastMonth: () => axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent").then(response => response.data),
	fetchAllTime: () => axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime").then(response => response.data)
};



class CamperLeaderboard extends Component{
	
	constructor(props){
		super(props);
		this.state = { campers: [] };
		this._loadLastMonth = this._loadLastMonth.bind(this);
		this._loadAllTime = this._loadAllTime.bind(this);
	}

	componentDidMount(){
		this._loadLastMonth();		
	}

	_loadLastMonth(){		
		this.setState({ campers: [] });
		api.fetchLastMonth()
		.then(campers => {
			this.setState({ campers: campers });
		});
	}

	_loadAllTime(){
		this.setState({ campers: [] });
		api.fetchAllTime()
		.then(campers => {
			this.setState({ campers: campers });
		});
	}

	render(){				
		return(			
			<div className='leaderboard-wrapper'>	
				<br />
				
				<table>
					<thead>
					  <tr>
					  	<th>#</th>
					    <th>Name</th>
					    <th onClick={this._loadLastMonth}>Points last month</th>
					    <th onClick={this._loadAllTime}>All time points</th>
					  </tr>
					</thead>
					
					{
						this.state.campers.length !== 0? 
						<TableBody campers={this.state.campers} />
						:<tbody><tr><td></td><td></td><td><Loader /></td><td></td></tr></tbody>
					}
				</table>
			</div>
		);
	}
};

function TableBody(props){
	const campers = props.campers;
	return(
		<tbody>
			{
				campers.map((camper, i) => (
					<tr key={i}>
						<td>{i+1}</td>
						<td>
							<ul>
								<li><img src={camper.img} alt={camper.username} /></li>
								<li><h4>{camper.username}</h4></li>
							</ul>
						</td>
						<td>{camper.recent}</td>
						<td>{camper.alltime}</td>
					</tr>
				))
			}				
		</tbody>
	)
};

function Loader(){
	return(
		<div className="loader">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
	);
};


export default CamperLeaderboard;


// css

// body{	
// 	font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
// }

// .loader{
// 	font-size: 25px;
// 	font-weight: bold;
// }
// @keyframes blink {50% { color: transparent }}
// .loader__dot { animation: 1s blink infinite }
// .loader__dot:nth-child(2) { animation-delay: 250ms }
// .loader__dot:nth-child(3) { animation-delay: 500ms }


// .leaderboard-wrapper{	
// 	margin: 50px auto;
// 	padding: 15px;
// }


// .leaderboard-wrapper table {
//     border-collapse: collapse;
//     width: 100%;
// }

// .leaderboard-wrapper th{
// 	cursor: pointer;
// }

// .leaderboard-wrapper td ul{
// 	list-style-type: none;
// 	padding: 0;
// 	margin: 0;
// }
// .leaderboard-wrapper td ul li{
// 	display: inline-block;
// 	margin-left: 15px;
// }
// .leaderboard-wrapper td ul li img{
// 	height: 50px;	
// 	border-radius: 50%;
// }

// .leaderboard-wrapper th, td {
//     padding: 8px;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
// }

// .leaderboard-wrapper tr:hover{background-color:#f5f5f5}