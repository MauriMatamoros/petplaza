module.exports = {
  apps : [{
    name: 'react-ecommerce',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      MONGO_SRV: 'mongodb+srv://administrator:cNoBxzAaSYEXhKH7@react-reserve-kno5p.mongodb.net/test?retryWrites=true&w=majority',
      JWT_SECRET: 'whateverthisisjusttesting',
      CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/mmatamoros/image/upload',
      STRIPE_SECRET_KEY: 'sk_test_7Pcv8oEESNTCNoZ69xYYc0qB00rVlAHKjX'
    }
  }]
};
