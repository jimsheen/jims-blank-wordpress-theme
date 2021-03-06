module.exports = {
    // copy: {
    main: {
        files: [
            // includes files within path
            // {
            //     expand: true,
            //     cwd: 'dev/css/',
            //     src: ['*.css'],
            //     dest: 'build/css/',
            //     filter: 'isFile'
            // },
            //  {
            //     expand: true,
            //     cwd: 'bower_components',
            //     src: ['/**'],
            //     dest: 'build/libs/js/',
            //     filter: 'isFile'
            // },
            {
                expand: true,
                cwd: 'dev',
                src: ['**/*', '!**/*.scss', '!**/*.css', '!**/*.css.map', '!**/*.js', '!assets'],
                dest: 'build/',
                filter: 'isFile'
            },
        ]
    },
    plugins: {
        files: [
        {
            expand:true,
            cwd: 'clones-folder',
            src: ['**/*'],
            dest: '../../../plugins/',
            filter: 'isFile'
        }]
    }
    // }
}
