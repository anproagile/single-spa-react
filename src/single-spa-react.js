const defaultOpts = {
	// required opts
	React: null,
	ReactDOM: null,
	rootComponent: null,
	domElementGetter: null,
}

export default function singleSpaReact(userOpts) {
	if (typeof userOpts !== 'object') {
		throw new Error(`single-spa-react requires a configuration object`);
	}

	const opts = {
		...defaultOpts,
		...userOpts,
	};

	if (!opts.React) {
		throw new Error(`single-spa-react must be passed opts.React`);
	}

	if (!opts.ReactDOM) {
		throw new Error(`single-spa-react must be passed opts.ReactDOM`);
	}

	if (!opts.rootComponent) {
		throw new Error(`single-spa-react must be passed opts.rootComponent`);
	}

	if (!opts.domElementGetter) {
		throw new Error(`single-spa-react must be passed opts.domElementGetter function`);
	}

	return {
		bootstrap: bootstrap.bind(null, opts),
		mount: mount.bind(null, opts),
		unmount: unmount.bind(null, opts),
	};
}

function bootstrap(opts) {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

function mount(opts) {
	return new Promise((resolve, reject) => {
		opts.ReactDOM.render(opts.React.createElement(opts.rootComponent), getRootDomEl(opts));
		resolve();
	});
}

function unmount(opts) {
	return new Promise((resolve, reject) => {
		opts.ReactDOM.unmountComponentAtNode(getRootDomEl(opts));
		resolve();
	});
}

function getRootDomEl(opts) {
	const el = opts.domElementGetter();
	if (!el) {
		throw new Error(`single-spa-react: domElementGetter function did not return a valid dom element`);
	}

	return el;
}
