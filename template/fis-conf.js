var GAME_ID = '{{-name-}}';

fis.config.set('roadmap.domain', 'PLACE_HOLDER/endgame/box/' + GAME_ID);

fis.config.get('roadmap.path').unshift(
    {
        reg: '**.html',
        useDomain: true
    },
    {
        reg: '**',
        query: "?t=${timestamp}"
    }
);

// fis.config.set('settings.postpackager.simple.autoCombine', true);

fis.config.set('deploy', {
    "publish" : {
        bcs: {
            host: 'bcs.duapp.com',
            ak: '{{-ak-}}',
            sk: '{{-sk-}}',
            bucket: 'endgame'
        },
        to: '/box/' + GAME_ID,
        replace : {
            from : 'PLACE_HOLDER/endgame/box/',
            to : '/endgame/box/'
        }
    },
    "test" : {
        bcs: {
            host: 'bcs.duapp.com',
            ak: '{{-ak-}}',
            sk: '{{-sk-}}',
            bucket: 'endgamedev'
        },
        to: '/box/' + GAME_ID,
        replace : {
            from : 'PLACE_HOLDER/endgame/box/',
            to : '/endgamedev/box/'
        }
    }
});