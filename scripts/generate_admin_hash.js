const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  try {
    const password = await ask('Enter admin password to hash: ');
    if (!password) {
      console.error('No password provided');
      process.exit(1);
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    console.log('\nCopy this value into your .env as ADMIN_PASSWORD_HASH=...');
    console.log('\n' + hash + '\n');
    rl.close();
  } catch (err) {
    console.error('Error generating hash', err);
    rl.close();
    process.exit(1);
  }
})();
