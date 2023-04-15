// If using CSS modules:
// https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media#modular-css-processing

const prod = process.env.NODE_ENV === "production";

export const plugins = {
	"postcss-preset-env": {
		autoprefixer: prod ? true : false,
		stage: 2,
		features: {
			"nesting-rules": true,
			"custom-media-queries": true,
			"all-property": false,
			"any-link-pseudo-class": false,
			"custom-properties": false,
			"font-variant-property": false,
			"gap-properties": prod ? true : false,
			"image-set-function": false,
			"is-pseudo-class": false,
			"logical-properties-and-values": false,
			"not-pseudo-class": false,
			"overflow-property": false,
			"overflow-wrap-property": false,
			"unset-value": false,
		},
	},
};
