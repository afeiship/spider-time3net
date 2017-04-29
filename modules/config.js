import nconf from 'nconf';
import path from 'path';

const config_path = path.join(__dirname,'../config/default.json');

nconf.use('file', {file: config_path});
nconf.load();

export default nconf;
