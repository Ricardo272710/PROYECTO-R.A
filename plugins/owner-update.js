import { execSync } from 'child_process'

var handler = async (m, { conn, text }) => {
//await conn.sendMessage(m.chat, { que: { texto: 'Isaac Roba Codigo', key: m.key } })
try {
const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()
if (messager.includes('Already up to date.')) messager = '🌐𝐌𝐞 𝐚𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐞 𝐝𝐞 𝐦𝐚𝐧𝐞𝐫𝐚 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚 𝐋𝐨𝐛𝐨-𝐋𝐢𝐭𝐞'
if (messager.includes('Updating')) messager = '🌐𝐌𝐞 𝐚𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐞 𝐝𝐞 𝐦𝐚𝐧𝐞𝐫𝐚 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚 𝐋𝐨𝐛𝐨-𝐋𝐢𝐭𝐞.\n\n' + stdout.toString()
conn.reply(m.chat, messager,)
} catch { 
try {
const status = execSync('git status --porcelain')
if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('sessions/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `📍𝐋𝐨𝐛𝐨-𝐋𝐢𝐭𝐞 𝐬𝐞 𝐚𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐨 𝐝𝐞𝐬𝐝𝐞 𝐞𝐥 𝐬𝐞𝐫𝐯𝐢𝐝𝐨𝐫/𝐇𝐨𝐬𝐭 𝐘 𝐚 𝐞𝐧𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 𝐜𝐨𝐧𝐟𝐥𝐢𝐜𝐭𝐨.\n\n𝐀𝐫𝐜𝐡𝐢𝐯𝐨𝐬 𝐍𝐮𝐥𝐥:\n\n${conflictedFiles.join('\n')}`
await conn.reply(m.chat, errorMessage,)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = '🔵 *Api Caida*'
if (error.message) {
errorMessage2 += '\n*- Mensaje de error:* ' + error.message;
}
await conn.reply(m.chat, errorMessage2,)
}
}

}
handler.help = ['update', 'actualizar']
handler.tags = ['own']
handler.command = /^(update|actualizar|gitpull)$/i
handler.rowner = true
//handler.limit = false
//handler.private = false


export default handler