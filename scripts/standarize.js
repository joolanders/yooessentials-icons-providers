const fs = require('fs');
const globby = require('globby');
const SVGO = require('svgo');

/**
 * Standarize icons for UIkit Icons compatibility
 **/

(async () => {

    const icons = await globby('icons/**/*.svg');

    const svgo = new SVGO({
        plugins: [
            {removeDimensions: true},
            {convertStyleToAttrs: true},
            {
                addAttributesToSVGElement: {
                    attribute: {'width': 20, 'height': 20}
                }
            }
        ]
    });

    for (const path of icons) {

        const data = fs.readFileSync(path, 'utf8');
        const result = await svgo.optimize(data, {path});

        fs.writeFileSync(path, result.data);
    }

})();
