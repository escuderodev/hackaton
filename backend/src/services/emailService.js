import { transporter } from "../config/emailConfig.js";
import { UserService } from "./userService.js";

export async function sendEmailNotification(post) {

const users = await UserService.userList();
console.log (users)  

const emails = users.map(user => user.email).join(",");
console.log (emails)

const data = new Date(post.endDate);

// Definir as opções de formatação
const opcoes = { 
  weekday: 'long', // Dia da semana
  year: 'numeric', // Ano
  month: 'long',   // Mês completo
  day: 'numeric'   // Dia numérico
};

// Formatar a data para o padrão desejado
const newDate = data.toLocaleDateString('pt-BR', opcoes);

console.log(newDate);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: "Novo post publicado!",
    text: `Um novo post foi publicado:\n\nTítulo: ${post.title}\nConteúdo: ${post.description}\nDisciplina: ${post.discipline}\nTipo: ${post.typeOfTasks}\nData de entrega: ${newDate}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
