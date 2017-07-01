/* © 2017
 * @author HuyPham
 */
import config from './config';

const HOST = 'http://localhost:8080';

export default {
	...config(process.env.HOST || HOST)
};
