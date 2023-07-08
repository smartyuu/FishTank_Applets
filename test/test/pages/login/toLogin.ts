import service from '../../http/httpRequest'
const reg={
	toLogin:(userName:string,psw:string)=>{
		console.log('hi');
		const data=service({
			url:'/wx/ucenter/login',
			method:'POST',
			data:{userName,psw}});
		console.log(data.then(res=>{console.log(res)}));
	},
	
}
export default reg