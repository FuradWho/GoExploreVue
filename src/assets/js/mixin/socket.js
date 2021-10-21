export default {
	methods: {
		// 开始链接socket
		handleCreateSocket () {
			const hostName = window.location.hostname;
			const planId = this.planId;
			const userId = this.user.user.id;
			this.socket = window.io(`http://${hostName}:9443?planId=${planId}&userId=${userId}`);
			this.socket.on('connect', () => {
				console.log('链接成功');
			});
			this.socket.on('disconnect', () => {
				console.error('链接失败');
			});
			this.socket.on('chat', (data) => {
				if (data) {
					console.log('接受到消息', JSON.parse(data));
					data = JSON.parse(data);
					let content = data.content && JSON.parse(data.content);
					let type;
					this.countDown = content && parseInt(content.countDown, 10);
					if (data.messageType === 'OVER_PK') { // 结束交卷
						this.pkState = '2';
						type = 'over';
					} else if (data.messageType === 'START_PK') {
						this.pkState = '1';
						type = 'start_pk';
					}
					this.handleInitMask(type);
				}
			});
		}
	}
};
