import React, {Component} from 'react';
import './App.css';
import assets$ from './mock';
import {Observable} from 'rxjs/Observable'

class App extends Component {
    state = {
        suggestions: new Map(),
        input: '',
        currentAsset: {}
    }

    constructor(props) {
        super(props)

        this.searchAssets = this.searchAssets.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    componentDidMount() {
        const inputEvent$ = Observable.fromEvent(this.inputSearch, 'input')
            .pluck('target', 'value')
            .filter(text => text.length > 1)
            .debounceTime(100)
            .distinctUntilChanged()
            .do(x => {
                this.setState(() => ({
                    currentAsset: {}
                }))
            })

        const clickSugg$ = Observable.fromEventPattern((handler) => {
            this.onClickSugg = handler
        })
            .do(v => {
                this.setState(() => ({
                    input: v.id + ' ' + v.assetName,
                    currentAsset: v
                }))
            })
            .map(v => v.id)

        const clickBuy$ = Observable.fromEventPattern((handler) => {
            this.onClickBuy = handler
        })
            .do(x => {
                if (!this.state.currentAsset.id) return
                const {id, assetName, price} = this.state.currentAsset
                alert('You buy asset: ' + [assetName, id, price].join(' '))
            })

        const merged$ = Observable.merge(inputEvent$, clickSugg$, clickBuy$)

        const stream$ = merged$.switchMap(this.searchAssets)
        this.subscribtion = stream$.subscribe(data => {
                this.setState((state) => {
                    const {suggestions, currentAsset} = state
                    if (currentAsset.id === data.id) {
                        return {
                            currentAsset: data
                        }
                    }
                    return {
                        suggestions: suggestions.set(data.id, data)
                    }
                })
            },
            error => {
                console.error(error)
            })
    }

    componentWillUnmount() {
        this.subscribtion.unsubscribe()
    }

    searchAssets(search) {
        this.setState(() => {
            return {
                suggestions: new Map()
            }
        })
        return assets$
            .filter(item => {
                const id = parseInt(search)
                if (item.id === id) {
                    this.setState(() => {
                        return {
                            currentAsset: item
                        }
                    })
                    return true
                }
                return item.assetName.includes(search) || item.id.toString().includes(search)
            })
    }

    handleChangeInput(event) {
        const value = event.target.value
        this.setState(() => ({input: value}))
    }

    render() {
        return (
            <div className="app">
                <form className="form">
                    <input placeholder="Type asset name or assetId here" type="text" onChange={this.handleChangeInput}
                           ref={el => this.inputSearch = el} value={this.state.input}
                    />
                    <button onClick={() => this.onClickBuy(this.state.currentAsset.id)} type="button">Buy</button>
                    <span>{this.state.currentAsset.price}</span>
                </form>
                <div className="autosuggestions">
                    {[...this.state.suggestions.values()].map(({id, assetName, price}) =>
                        (<li onClick={() => this.onClickSugg({...{id, assetName, price}})}
                             key={id}>{id}: {assetName} = {price}</li>)
                    )}
                </div>
            </div>
        );
    }
}

export default App;
