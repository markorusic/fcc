const app = (function(){
	const model = {
		channelNames: ["admiralbulldog", "dendi", "w33haa", "wagamamatv", "jcarverpoker", "scarra", "canceldota", "mfpallytime", "sing_sing", "freecodecamp", "nightblue3", "arteezy", "trick2g", "esl_sc2", "wtii", "nobbel87"],
		channels: [],
		activeTab: document.location.hash?document.location.hash.slice(1):'All'
	};

	const controller = {
		channelsToDisplay: model.channels,

		init: function(){						
			document.location.hash = model.activeTab;
			navView.init(model.activeTab);
			loaderView.render();
			
			model.channelNames.forEach(channelName => {				
				$.get(`https://wind-bow.glitch.me/twitch-api/channels/${channelName}`)
				.then(data =>{		
					let channelData = {
						name: data.name,
						url: data.url,
						logo: data.logo,
						online: null,
						status: null
					};

					$.get(`https://wind-bow.glitch.me/twitch-api/streams/${channelName}`)
					.then(data =>{					
							channelData.online = data.stream!== null?"Online":"Offline";
							channelData.status = data.stream!== null?data.stream.channel.status:"";
							model.channels.push(channelData);		
							this.channelsToDisplay = model.channels;												

							const channelsToRender = model.activeTab === "All"?this.channelsToDisplay:this.channelsToDisplay.filter(channel => channel.online === model.activeTab);
							channelsView.render(channelsToRender);
						});										
					});	
			});			
												
		},

		setActiveTab: function(newTab){
			const channelsToRender = newTab === 'All'?model.channels:model.channels.filter(channel => channel.online === newTab);
			navView.clearSearch();			
			model.activeTab = newTab;	
			document.location.hash = newTab;								
			this.channelsToDisplay = channelsToRender;			
			channelsView.render(channelsToRender);							
		},

		search: function(val){						
			const channelsToRender = this.channelsToDisplay.filter(channel => channel.name.indexOf(val) !== -1);
			channelsView.render(channelsToRender);			
		}
	};

	const channelsView = {				
		renderChannel: function(channel){					
			return `<li class="list-group-item">
				<img class='logo' src=${channel.logo} />
				<a href=${channel.url} target='_blank'>${channel.name}</a>	
				<span class="${channel.online==='Online'?'badge online':'badge'}">${channel.online==='Online'?'Online':'Offline'}</span>
				<br>
				<small class='status'>${channel.status}</small>							
			</li>`
		},
		render: function(channels){			
			$('.channels').html(`
				<ul class="list-group">
					${channels.map(channel=>this.renderChannel(channel)).join('')}								
				</ul>
			`);
		}
	};

	const navView = {
		init: function(activeTab){
			this.render(activeTab);			
			this.bindEvents();
		},

		bindEvents: function(){
			$('.tab a').on('click', function(){						
				controller.setActiveTab($(this).attr('href').slice(1));
			});
			$('.search').on('keyup', function(e){							
				controller.search(e.target.value);
			});
		},

		clearSearch: function(){
			$('.search').val('');
		},

		render: function(activeTab){			
			$('.nav-tabs').append(`
				<ul class="nav nav-tabs">
				  <li class="${activeTab==='All'?'active tab':'tab'}"><a data-toggle="tab" href="#All">All</a></li>
				  <li class="${activeTab==='Online'?'active tab':'tab'}"><a data-toggle="tab" href="#Online">Online</a></li>
				  <li class="${activeTab==='Offline'?'active tab':'tab'}"><a data-toggle="tab" href="#Offline">Offline</a></li>
				</ul>
				<input class='search' type='text' placeholder='Search for channel'>				
			`);
		}
	};

	const loaderView = {
		render: function(){
			$('.channels').html(`<div class="loader">Loading<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>`);
		}
	}

	return { init: controller.init };
})();


$(function(){
	app.init();
});
