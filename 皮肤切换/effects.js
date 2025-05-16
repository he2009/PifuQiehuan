// 技能特效绑定  武将id 技能函数
window.pfqhSkillEffect = {
    caiwenji: [
        {
            trigger: { player: 'judgeEnd' },
            filter: function (event, player) {
                let ep = event.getParent()
                if (!ep.player.dynamic) return false
                //let name = decadeUI.dynamicSkin.ol_caiwenji && decadeUI.dynamicSkin.ol_caiwenji.测试皮肤 && decadeUI.dynamicSkin.ol_caiwenji.测试皮肤.name

                return ep.name === 'olbeige' || ep.name === 'beige' || ep.name === 'rebeige' || ep.name === 'dshj_beige'
            },
            direct: true,
            charlotte: true,
            forced: true,
            silent: true,
            content: function () {
                if (!trigger.result || !trigger.result.suit) return;
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1.3, speed: 0.8}
                switch (trigger.result.suit) {
                    case 'spade':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play',
                        }, position)
                        break;
                    case 'heart':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play4',
                        }, position)
                        break;
                    case 'club':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play2',
                        }, position)
                        break;
                    default: // diamond 方块
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play3',
                        }, position)
                }
            }
        },                      
        {//左棻
        trigger: {
            target: "dshj_zhaosongBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/青荷粽香/jineng02',
                             json: true,
                           version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "dshj_zhaosong_equipBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/青荷粽香/jineng02',
                             json: true,
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "dshj_zhaosong_trickBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/青荷粽香/jineng03',
                              json: true,
                           version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "dshj_zhaosong_basicBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/青荷粽香/jineng04',
                             json: true,
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            target: "zhaosongBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/凝脂铅华/jineng02',
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "zhaosong_equipBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/凝脂铅华/jineng02',
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "zhaosong_trickBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/凝脂铅华/jineng03',
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        {
        trigger: {
            player: "zhaosong_basicBegin",
        },
        forced: true,
        Charlotte: true,
        content: function () {
                skinSwitch.chukuangWorkerApi.playEffect({
                     name: '../../../十周年UI/assets/dynamic/左棻/凝脂铅华/jineng04',
                            version: '4.0',
                            action: 'play',
                }, { scale: 0.7, speed: 1, parent:player,});
            }
        },
        //潘淑
              {
        trigger: {
            player: ['useCard', 'respond'],
        },
	    silent: true,
        forced: true,
        firstDo: true,
        content: function () {  
           //潘淑和黄月英
            if (get.name(trigger.card) == "sha"&&get.name(trigger.player) == "ol_sb_huangyueying"&& lib.config['extension_皮肤切换_enable']) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     json: true,
                     name: '../../../皮肤切换/effects/TeQuan_sha',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/sha.mp3');
            }
            if (get.name(trigger.card) == "shan"&&get.name(trigger.player) == "ol_sb_huangyueying"&& lib.config['extension_皮肤切换_enable']) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     json: true,
                     name: '../../../皮肤切换/effects/TeQuan_shan',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/shan.mp3');
            }
            if (get.name(trigger.card) == "sha"&&get.name(trigger.player) == "dshj_AUpanshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/sha.mp3');
            }
            if (get.name(trigger.card) == "shan"&&get.name(trigger.player) == "dshj_AUpanshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play2',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/shan.mp3');
            }
            if (get.name(trigger.card) == "tao"&&get.name(trigger.player) == "dshj_AUpanshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play3',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
            }
            if (get.name(trigger.card) == "jiu"&&get.name(trigger.player) == "dshj_AUpanshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play4',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/jiu.mp3');
            }           
            if (get.name(trigger.card) == "sha"&&get.name(trigger.player) == "panshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
   				game.playAudio('../extension/皮肤切换/effects/sha.mp3');
           }
            if (get.name(trigger.card) == "shan"&&get.name(trigger.player) == "panshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play2',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/shan.mp3');
            }
            if (get.name(trigger.card) == "tao"&&get.name(trigger.player) == "panshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play3',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
            }
            if (get.name(trigger.card) == "jiu"&&get.name(trigger.player) == "panshu" && lib.config['extension_皮肤切换_enable'] ) {
                skinSwitch.chukuangWorkerApi.playEffect({
                     action: 'play4',
                     name: '../../../皮肤切换/effects/潘淑/jineng02',
                     version: '4.0',
                }, { scale: 0.8, speed: 2, });
  				game.playAudio('../extension/皮肤切换/effects/jiu.mp3');
            }
        }
    },                             
        {
            trigger: { player: 'chooseToUse' },
            filter: function (event, player) {
                let ep = event.getParent()
                // if (!ep.player.dynamic) return false

                return ep.name === 'jinzhi' 
            },
            direct: true,
            charlotte: true,
            forced: true,
            silent: true,
            content: function () {
                if (!trigger.result || !trigger.result.cardname) return;
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1.3, speed: 0.8}
                switch (trigger.result.cardname) {
                    case 'sha':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/潘淑/jineng02',
                            version: '4.0',
                            action: 'play',
                        }, position)
                        break;
                    case 'shan':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/潘淑/jineng02',
                            version: '4.0',
                            action: 'play2',
                        }, position)
                        break;
                    case 'tao':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/潘淑/jineng02',
                            version: '4.0',
                            action: 'play3',
                        }, position)
                        break;
                    case 'jiu':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/潘淑/jineng02',
                            version: '4.0',
                            action: 'play4',
                        }, position)
                        break;
                }
            }
        },    
        /*{
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('caiwenji')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/蔡文姬击杀/JiSha',
                        json: true,
                        version: '4.0',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('jikang')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 0.89, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/嵇康击杀/jik',
                        speed: '0.8',
                        version: '4.1',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('daqiao')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/大乔击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('jikang')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/嵇康击杀/Jik',
                        version: '3.8',
                        speed: '0.7',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('jiaxu')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/贾诩击杀/JiSha',
                        version: '4.0',
                        speed: '0.7',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('guanyu')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/关羽击杀/JiSha',
                       version: '4.0',
                       speed: '0.7',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('ganning')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/甘宁击杀/JiSha',
                        version: '4.0',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('machao')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/马超击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('sunquan')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/孙权击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhaoyun')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/赵云击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhangfei')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/张飞击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('lijue')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/李傕击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('liubei')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/刘备击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('lvbu')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/吕布击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('mayunlu')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/马云禄击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('taishici')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/太史慈击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('wangyi')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/王异击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('huanggai')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/黄盖击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('xuchu')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/许褚击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhangliaoi')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/张辽击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhenji')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/甄姬击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhangxingcai')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/张星彩击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('xiahoushi')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/夏侯氏击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('xiaoqiao')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/小乔击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('sp_sunshangxiang')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/sp孙尚香击杀/JiSha',
                        speed: '0.7',
                        version: '4.0',
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('jin_simashi')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/司马师击杀/JiSha',
                        version: '4.0',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('dshj_AUsimashi')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 1, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/司马师击杀/JiSha',
                        version: '4.0',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('diaochan')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 0.4, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/貂蝉击杀/jisha',
                        version: '3.6',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('sunshangxiang')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 0.4, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/孙尚香击杀/jisha',
                        version: '3.6',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('yuanshao')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 0.4, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/袁绍击杀/jisha',
                        version: '3.6',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },
        {
            trigger: {
                source: "dieBegin",
            },
            silent: true,
            charlotte: true,
            forced: true,
            priority: 2022,
            filter(event, player) {
                return event.source.name.endsWith('zhugejin')
            },
            content: function () {
                let position = {x: [0, 0.5], y: [0, 0.5], scale: 0.4, speed: 0.8}
                setTimeout(() => {
                    skinSwitch.chukuangWorkerApi.playEffect({
                        name: '../../../皮肤切换/effects/诸葛瑾击杀/jisha',
                        version: '3.6',
                        speed: '0.7'
                    }, position)
                }, 200)
            }
        },*/
    ]
}