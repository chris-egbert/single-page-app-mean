var config_env = {};

// Production Environment
config_env.production = {
    "app_name" : "My App 2",
    "listen_port" : 3000,
    "session_secret" : "T0n7M2p3B3",
    "db" : {
       "url" : "mongodb://localhost:27017/sample-app"
     }
}

// Clone the Production environment to Dev for default inheritence
config_env.development = config_env.production;

// Override config for Dev here
// config_env.development['listen_port'] = 3001;

var current_env = process.env.NODE_ENV || "development";

module.exports = config_env[current_env];
