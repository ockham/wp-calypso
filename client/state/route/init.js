/**
 * Internal dependencies
 */
import { registerReducer } from 'state/redux-store';
import routeReducer from './reducer';

registerReducer( [ 'route' ], routeReducer );
