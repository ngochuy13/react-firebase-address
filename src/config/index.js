/* © 2017
 * @author HuyPham
 */
import config from './config';

const HOST = 'http://localhost:3001';

export default {
	...config(process.env.HOST || HOST)
};
