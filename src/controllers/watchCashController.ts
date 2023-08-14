import dotenv from 'dotenv';
import prisma from '../../lib/db';
import axios from 'axios'

const Tail = require('tail').Tail;
// const axios = require('axios');
const { json } = require('express');



dotenv.config();
const enableAutoBan = process.env.EnableAutoBan === 'true'; // Convertendo para booleano
const PORT = process.env.PORT
const API_URL = process.env.API_URL

      // Adicione o arquivo equivalente a world2.formatlog
const sourceFilePath = 'C:/Users/kiq_b/Documents/pwserver/logs/world2.formatlog';

const processCashLine  = async (line: string) => {
      // Se dentro do world2.formatlog for adicionado a seguinte linha
  const logData = line.match(/formatlog:addcash:userid=(\d+):oldserial=(\d+):newserial=(\d+):cash_add=(\d+):delta=(\d+)/);
  console.log(logData)

  if (logData) {

    // Aqui desestruturamos os valores da linha de log para variáveis individuais
    const [, userId, , , , cashAdd] = logData;
    // precisamos converter o valor de cash para int
    const cashAddInt = parseInt(cashAdd)

    // criamos uma função de aviso sobre o limite de cash
    const warnCashLimit = async(cashAddInt: number, userId: any) => {
      // Configuramos o Limite de cash dentro de .env
      const cashLimitString = process.env.CASHLIMIT;
      // Também convertemos este valor para Int e multiplicamos por 100, e como o valor não pode ser nulo, adicionamos um valor padrão para o limite
      const cashLimit = cashLimitString ? parseInt(cashLimitString) * 100: 999990000;
    
          // Se for adicionado no jogo um valor acima do limite estabelecido
      if(cashAddInt >= (cashLimit)) {
        console.log('cashint', cashAddInt)
        console.log("Limite de cash atingido", cashAddInt)
        // Dividindo o valor por 100 para enviarmos o valor de cash para o banco de dados
        const cash = cashAddInt / 100

        // Salva quantidade de gold enviados, usuário e data/hora
        const saveUseCashLog = await prisma.cashlog.create({
          data: { 
            cashSent: cash,
            userid: parseInt(userId),
            date: new Date() 
          }
        });
        

        if (enableAutoBan) {
          const postUser = {
            userId,
            time: 99999999,
            reason: `você recebeu um deposito de ${cash} em cash`
          };

          const banUser = await axios.post(`${API_URL}:${PORT}/banuser`, postUser);
          
          const roles = await axios.post(`${API_URL}:${PORT}/getroles`, postUser);
          const userRoles = roles.data
          for (const role of userRoles) {
              const postRole = {
                roleid: role.id,
                time: 120,
                reason: `você recebeu um deposito de ${cash} em cash`
              }
              console.log('postrole', postRole)
              const banRole = await axios.post(`${API_URL}:${PORT}/banrole`, postRole);
              console.log('veja o banrole aqui', banRole)
          }

          
        } else {
          console.log("nenhum personagem encontrado")
        }
      } else {
        return
      }
    }

    // chamando a função
    warnCashLimit(cashAddInt, userId);
  }
};

const tail = new Tail(sourceFilePath);

tail.on('line', (line: any) => {
  processCashLine(line);
});

console.log('Monitorando o arquivo de logs em tempo real...');

export default processCashLine