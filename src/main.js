import React from 'react'
import PropTypes from 'prop-types';

class Component extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            state: 'hidden',
        };

        this.count = 0;
        this.runningTimerId = null;
        this.hidingTimerId = null;

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.hideAll = this.hideAll.bind(this);
        this.toHiddenState = this.toHiddenState.bind(this);
        this.isVisible = this.isVisible.bind(this);
    }

    render() {
        let cls = `loader-60devs ${this.props.cls}`

        return (
            <div className={cls} data-state={this.state.state} ref={element => this.element = element}>
                <div className="loader-60devs-progress"></div>
            </div>
        )
    }

    show() {
        if(++ this.count > 1)
            return

        clearTimeout(this.hidingTimerId)

        var {element} = this
        let progressEl = element.querySelector('.loader-60devs-progress')

        element.setAttribute('data-state', 'hidden')
        // the only working way to restart a transition on firefox
        progressEl.outerHTML = progressEl.outerHTML
        element.offsetHeight
        element.setAttribute('data-state', '')
        element.offsetHeight
        element.setAttribute('data-state', 'running')
    }

    hide() {
        if(-- this.count > 0)
            return

        this.element.setAttribute('data-state', 'finishing')
        this.hidingTimerId = setTimeout(this.toHiddenState, 500)
    }

    hideAll() {
        this.count = 1
        this.hide()
    }

    toHiddenState() {
        this.element.setAttribute('data-state', 'hidden')
    }

    componentWillMount() {
        Component.instance = this
    }

    componentWillUnmount() {
        delete Component.instance
    }

    isVisible() {
        return this.element.getAttribute('data-state') != 'hidden'
    }
}

export default {
    Component: Component,
    show() {
        Component.instance.show()
    },
    hide() {
        Component.instance.hide()
    },
    hideAll() {
        Component.instance.hideAll()
    },
    isVisible() {
        return Component.instance.isVisible()
    }
}
