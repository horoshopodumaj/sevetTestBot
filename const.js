const commands = `
/start - Перезапустить бота
/help - Помощь
/phones - Наши телефоны


`;

const textButton = {
    dispatcher: `Телефон диспетчера +7(789)123-45-67`,
    plumber: `Телефон слесаря +7(789)123-45-68`,
    emergency: `Телефон экстренных служб +7(789)123-45-00`,
};

module.exports.commands = commands;
module.exports.textButton = textButton;
