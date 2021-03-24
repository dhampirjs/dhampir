/* Setup testing framework module.
**
** This module will be executed before each test.
**
** Since setupFiles executes before the test framework is
** installed in the environment, this script file presents
** you the opportunity of running some code immediately
** after the test framework has been installed in the
** environment.
**
*/
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
configure({ adapter: new Adapter() });
