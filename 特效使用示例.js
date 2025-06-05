
// 1. 播放普通特效（不循环）
function playNormalEffect() {
    let effect = {
        name: 'effect/explosion',
        scale: 1.0,
        speed: 1.0,
        x: [0.5, 0.5],
        y: [0.5, 0.5]
    };
    skinSwitch.chukuangWorkerApi.playEffect(effect);
}

// 2. 播放循环特效（安全方式）
function playLoopEffectSafe() {
    let effect = {
        name: 'effect/fire',
        loop: true,
        maxTime: 3000,  // 最多播放3秒后自动清除
        scale: 0.8,
        x: [0.3, 0.3],
        y: [0.7, 0.7]
    };
    skinSwitch.chukuangWorkerApi.playEffect(effect);
}

// 3. 播放循环特效（指定循环次数）
function playLoopEffectWithCount() {
    let effect = {
        name: 'effect/magic_circle',
        loop: true,
        maxLoops: 3,  // 最多循环3次
        scale: 1.2,
        x: [0.5, 0.5],
        y: [0.5, 0.5]
    };
    skinSwitch.chukuangWorkerApi.playEffect(effect);
}

// ===== 清除功能 =====

// 4. 清除指定特效
function clearSpecificEffect() {
    let effectToStop = {
        name: 'effect/fire'  // 停止名为'effect/fire'的特效
    };
    skinSwitch.chukuangWorkerApi.clearEffect(effectToStop);
}

// 5. 清除所有特效
function clearAllEffects() {
    skinSwitch.chukuangWorkerApi.clearAllEffects();
    console.log('已清除所有特效');
}

// ===== 实际应用示例 =====

// 6. 技能释放特效组合
function skillEffectCombo() {
    // 先播放蓄力特效（循环）
    let chargeEffect = {
        name: 'effect/charge',
        loop: true,
        maxTime: 2000,  // 蓄力2秒
        scale: 0.6
    };
    skinSwitch.chukuangWorkerApi.playEffect(chargeEffect);
    
    // 2秒后播放释放特效
    setTimeout(() => {
        // 清除蓄力特效
        skinSwitch.chukuangWorkerApi.clearEffect({name: 'effect/charge'});
        
        // 播放释放特效
        let releaseEffect = {
            name: 'effect/skill_release',
            scale: 1.5,
            speed: 1.2
        };
        skinSwitch.chukuangWorkerApi.playEffect(releaseEffect);
    }, 2000);
}

// 7. 战斗状态特效管理
let battleEffects = [];

function startBattleEffects() {
    // 播放多个循环特效
    let effects = [
        {
            name: 'effect/aura',
            loop: true,
            maxTime: 10000,  // 10秒战斗光环
            scale: 0.8
        },
        {
            name: 'effect/power_up',
            loop: true,
            maxTime: 5000,   // 5秒强化特效
            scale: 0.5
        }
    ];
    
    effects.forEach(effect => {
        skinSwitch.chukuangWorkerApi.playEffect(effect);
        battleEffects.push(effect.name);
    });
}

function endBattleEffects() {
    // 逐个清除战斗特效
    battleEffects.forEach(effectName => {
        skinSwitch.chukuangWorkerApi.clearEffect({name: effectName});
    });
    battleEffects = [];
    console.log('战斗特效已清除');
}

// ===== 注意事项 =====

/* 

1. 循环特效务必设置maxTime或maxLoops，避免无限播放
2. 如果忘记设置，系统会自动设置5秒的最大时间
3. 使用clearEffect()清除指定特效
4. 使用clearAllEffects()清除所有特效
5. 在场景切换时记得清除特效

错误用法（会导致问题）：
let badEffect = {
    name: 'effect/fire',
    loop: true  // 没有设置maxTime或maxLoops，会一直播放！
};

正确用法：
let goodEffect = {
    name: 'effect/fire',
    loop: true,
    maxTime: 3000  // 3秒后自动停止
};
*/

// 导出函数供其他地方使用
if (typeof module !== 'undefined') {
    module.exports = {
        playNormalEffect,
        playLoopEffectSafe,
        playLoopEffectWithCount,
        clearSpecificEffect,
        clearAllEffects,
        skillEffectCombo,
        startBattleEffects,
        endBattleEffects
    };
} 