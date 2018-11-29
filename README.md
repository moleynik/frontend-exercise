# Guidelines
You will have to submit this task with git (you can use Github or Bitbucket).
After you are finishing make sure the code is pushed and send an email/skype with a link.

The code should be runnable on Chrome (don't worry about the rest), NPM start or something simple for run it.

Stack: Rxjs (or similar libs even Observable proposal), ES6/ES7 or Typescript

The UI is just for demonstration there are no “point” for UX or design.
We are looking for native Reactive solution, with Reactive paradigm, not Imperative or functional Paradigm

BAD:
```typescript
obs.subscribe((n)=>{
  /// all the logic
});
```

GOOD:
```typescript
obs
  .logic()
  .doSomething()
  ...
  .subscribe();
```

## You have this model
```typescript
interface Asset {
	id: number
	assetName: string; // "USD", Samsung Electronics Co Ltd : "SSNLF"
	price: number; // asset current price relative to USD
	lastUpdate: number; // unix timestamp
	type: "Currency" | "Stock"; // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
}
```

## Mock

Creates 400 random assets, 200 currencies and 200 stocks (just the types is itersting, you don't need real assets) id 1-400
Create a stream from those 400 assets that fires 1 updates per secound for each asset:
* price must be changed each update by -1 to 1 and with the current timestamp, the rest will stay the same

you can find the mock at mock.js
It's exports a mock, rxjs observable with the required stream

This is not a starter or boilerplate it's just for confirm that the mock isn't brooken
You still can boot your project how ever you want

### see the mock running
npm/yarn install
npm test

You should see console log with the object on the steam


## Create the following app using this stream:

1. Create a buy asset form
2. User fills the asset name or id in the input
3. When user click on buy, the user should get notification with assetName (with its id and current(!) price)
4. When a user starts typing he will get the list of suggestions below an input (each suggestion should include assetName, id and current price)
5. When user click on suggestion it will fill the value of input (assetName and id - price should not be included in the input)
6. When asset id is typed in the input you must show the asset price next to the input (keep it updated according to the changes of the price for this asset)
7. Advance behavior (Do it after 1-6 are done):

7.1. Suggest buy name and id

7.2. Suggest assets only after 2nd character typed

7.3. If character typed in a row (less then 100ms) between types, suggest assets when typing sequence is over.
