//新增文鸯选势力换肤


//1.千幻ext.js搜lib.skill._qhlyChageKillingSkin    放这个函数下面

      lib.skill._qhlyChangeGroupSkin = {
        trigger: {
         global: 'gameStart' 
         },
        filter: function (event, player) {
          return lib.qhly_skinChange[game.qhly_getRealName(player.name1)] || lib.qhly_skinChange[game.qhly_getRealName(player.name2)];
        },
        direct: true,
        forced: true,
        charlotte: true,
        content: function () {
      var groupMap = {
        'wei': ['wei'],
        'shu': ['shu'],
        'wu': ['wu'],
        'qun': ['qun']
};
      function getFirstGroupType(characterName) {
        var group = get.groupnature2(lib.character[characterName]);
        for (var type in groupMap) {
          if (groupMap[type].some(function(keyword) { return group.startsWith(keyword); })) {
      return type;
    }
  }  
  return null; 
}
//先切换动皮，导致接口传不过去
//window.skinChangeExecuted = false;
      var playerGroupType = getFirstGroupType(player.name);
      var currentPlayerGroupType = player.group;
// 检查
      if (currentPlayerGroupType !== playerGroupType) {
        game.qhly_changeSkillSkin(player, 'changeGroup');
//  window.skinChangeExecuted = true;
}   
        }
      }
     
      
//2.皮切ext.js，把这个放lib.skill._pfqh_check_jisha下面


   lib.skill._pfqh_check_changeGroup = {
    trigger: {
        global: 'gameStart'
    },
    silent: true,
    charlotte: true,
    forced: true,
    priority: 2022,
    filter(event, player) {
   /*     if (!window.skinChangeExecuted) {
            return;
        }   */         
        return player.dynamic;
    },
    content: function() {
            let res = skinSwitch.dynamic.getSpecial(player, 'changeGroup');
            //接口传不过来呜呜呜，再写一遍
            var groupMap = {
              'wei': ['wei'],
              'shu': ['shu'],
              'wu': ['wu'],
              'qun': ['qun']
            };
            function getFirstGroupType(characterName) {
              var group = get.groupnature2(lib.character[characterName]);
              for (var type in groupMap) {
                if (groupMap[type].some(function(keyword) { return group.startsWith(keyword); })) {
                  return type;
    }
  }  
  return null; 
}
            var playerGroupType = getFirstGroupType(player.name);
            var currentPlayerGroupType = player.group;
            if (currentPlayerGroupType !== playerGroupType) {    

        // 检查是否执行过换肤操作
        res.forEach(r => {
            const { avatar, special, effs, isPrimary } = r;
            let audio;

            let tryTransform = () => {
                let transform = effs.transform;
                if (!transform || !(transform in special)) return;
                let trans = special[transform];
                let dskins = decadeUI.dynamicSkin;
                // 播放转换的骨骼
                let newName = trans.name;
                if (newName) {
                    // 分割名字, 获取骨骼, 与当前角色的骨骼的名字比较,是否是同名
                    let [key, skinName] = newName.split('/');
                    let dInfo = key && skinName && dskins[key] && dskins[key][skinName];
                    if (dInfo) {
                        skinSwitch.dynamic.transformDst(player, isPrimary, dInfo, { huanfuEffect: effs.effect });
                    }
                } else {
                    skinSwitch.dynamic.transformDst(player, isPrimary, trans, { huanfuEffect: effs.effect });
                }
                audio = trans.audio;
            };

            let tryEffectPlay = () => {
                // 检查是否有播放特效
                let effectPlay = effs.play;
                if (effectPlay) {
                    let eff = special[effectPlay];
                    if (eff) {
                        if (!eff.x) eff.x = [0, 0.5];
                        if (!eff.y) eff.y = [0, 0.5];
                        setTimeout(() => {
                            skinSwitch.chukuangWorkerApi.playEffect(eff);
                        }, (eff.delay || 0) * 1000);
                        if (!audio) audio = eff.audio;
                    }
                }
            };
            tryTransform();
            tryEffectPlay();

            if (!audio) audio = special.condition.changeGroup.audio;
            if (audio) {
                game.playAudio('..', skinSwitch.dcdPath, 'assets/dynamic', audio);
            }

        });
       }                
    }
};


//3.皮切ext.js搜const triggerConstant


                    const triggerConstant = {
                        lowhp: '血量变化',
                        jisha: '击杀',
    /*加这个*/          changeGroup: '改变势力',
                        juexing: '觉醒技',
                        xiandingji: '限定技',
                        zhuanhuanji: '转换技',
                        damage: '受伤次数',
                    }
                    
                    
//4.直接写参数就行
                    