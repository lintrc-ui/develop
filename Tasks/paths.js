const devDir = './develop',
			publicDir = './public';

module.exports = {
	pages: {
		develop: `${devDir}/pages/*.pug`,
		watch: `${devDir}/{blocks,pages}/**/*.pug`,
		public: `${publicDir}/`
	},
	styles: {
		develop: `${devDir}/sass/*.{sass,scss}`,
		watch: `${devDir}/{blocks,sass}/**/*.{sass,scss}`,
		public: `${publicDir}/css/`
	},
	scripts: {
		modules: `${devDir}`,
		auxiliary: [`${devDir}/js/*.*`, `!${devDir}/js/*.js`],
		scriptsList:`.${devDir}/js/order-scripts`,
		watch: `${devDir}/{blocks,js}/**/*.js`,
		outputFile: '-common.min.js',
		public: `${publicDir}/js/`
	},
	images: {
		develop: `${devDir}/{img,images}/**/*`,
		watch: `${devDir}/{img,images}/**/*`,
		public: `${publicDir}/`
	},
	static: {
		develop: `${devDir}/fonts/**/*.woff`,
		watch: `${devDir}/fonts/**/*`,
		public: `${publicDir}/css/`
	},
	favicon: {
		develop: `${devDir}/favicon/*.{svg,png}`,
		watch: `${publicDir}/*.html`,
		public: `${publicDir}/favicons/`
	}
};
