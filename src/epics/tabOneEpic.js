import { of } from 'rxjs'
import { switchMap, mergeMap, catchError } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { getJSON } from '../utils/ajaxUtils'
import Actions from '../actions'
import Config from '../config';

const URLS = {
  DATA: `${Config.serverHost}/api/v1/products`
};

const queryCache = {};

export const requestTabOneDataEpic = action$ =>
  action$.pipe(
    ofType(Actions.TAB_ONE_DATA_REQUESTED),
    switchMap((action) => {

      const {query} = action.payload;  

      if(!queryCache[query]){
        let uri = URLS.DATA;
        
        query && (uri = `${uri}?query=${query}`);
        return getJSON(uri).pipe(
          mergeMap((response) => { 
            queryCache[query] = response;
            return of(Actions.tabOneDataReceived({products: response}));
          }),
          catchError(error => of(Actions.fetchRejected(error)))
        );
      }
      else{
        return of(Actions.tabOneDataReceived({products: queryCache[query]}));
      }
    })
  )
