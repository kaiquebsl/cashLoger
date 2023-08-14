
import { WritePacket } from "../packeter";


async function banRole(roleid, time, reason) {
	try {
		// ban types: 100-role, 101-chat,102-?,103-?
		const packet = new WritePacket(29100);			
		packet.WriteUByte(100); 
		packet.WriteUInt32(-1)		// gm id
		packet.WriteUInt32(0); 							// localsid
		packet.WriteUInt32(roleid); 					// target id
		packet.WriteUInt32(time); 					// time
		packet.WriteString(reason); 					// allways
		packet.Pack(0x16E);								// pack opcode and length
		packet.Send();		

		return
		
	} catch (err) {
		console.log(err, 'Sorry, but something went wrong... ');
		throw err; // Lançar o erro novamente para que seja tratado por quem chamar a função
	}
}

export default banRole