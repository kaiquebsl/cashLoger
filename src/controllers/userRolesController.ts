const { WritePacket} = require('../packeter');
const { userRoleListScheme } = require('../schemes/userScheme');

async function getRoleList(userId) { 
	try {
    console.log('O ID DO USUÁRIO É', userId)
		let roleList;
		const packet = new WritePacket(userRoleListScheme);			
		packet.WriteUInt32(-1); // always
		packet.WriteUInt32(userId); // userId
		packet.Pack(0xD49); // pack opcode and length
		roleList = (await packet.Request()).base.roles;

		return roleList;
		
	} catch (err) {
		console.log(err, 'Sorry, but something went wrong... ');
		throw err; // Lançar o erro novamente para que seja tratado por quem chamar a função
	}
}

export default getRoleList