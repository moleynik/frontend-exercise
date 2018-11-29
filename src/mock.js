import {Observable} from 'rxjs/Observable';
import Rx from 'rxjs/Rx';

// const hashCode = (s) => {
//     return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
// }
function hashCode(s) {
    var text = "";
    var possible = "ABCDEFGHJKL";

    for (var i = 0; i < s.length; i++)
        text += possible.charAt(s.charCodeAt(i)-48);

    return text;
}
const createAsset = (assetId, assetType) => {
  return {
    id: assetId,
    assetName: hashCode(assetId.toString()),
    price: Math.random()*10,
    lastUpdate: Date.now(),
    type: assetType
  }
};

const getAllAssets = (n) => {
  const result = [];
  for (let i = 10000; i < 10000 + n; i++) {
    result.push(createAsset(i, 'Stock'));
    result.push(createAsset(i+n, 'Currency'));
  }
  return result;
}

const assets = getAllAssets(200);

const timeObservable = Rx.Observable.interval(1000);
export default Observable.create((ob) => {
	timeObservable.subscribe(() => {
	  Rx.Observable.from(assets)
		.map(val => {
		  const random = Math.random();
		  val.price = random >= 0.5 ? val.price + random : val.price - random;
		  val.lastUpdate = Date.now();
		  return val;
		})
		.subscribe(val => ob.next(val));
	});
	return () => null; // we don't care about unsubscribe just for a test
});
