const parseEnv = () => {
    Object.keys(process.env).forEach(key => {
        if (key.startsWith('MITSO_')) {
            console.log(`MITSO_${key}=${process.env[key]};`);
        }
    });
};

parseEnv();