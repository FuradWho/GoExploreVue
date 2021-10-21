export default {
	created () {
		const user = this.$storage.get('user');
		this.user = user ? JSON.parse(user) : {};
	}
};
