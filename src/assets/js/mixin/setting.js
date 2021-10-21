export default {
	created () {
		this.setting = this.$storage.get('setting') ? JSON.parse(this.$storage.get('setting')) : {};
	}
};
