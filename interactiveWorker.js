'use strict';

// 导入现有的worker功能
importScripts('chukuangWorker.js');

/**
 * 互动出框播放Worker
 * 专门处理响应其他玩家卡牌的出框动画
 */

// 互动出框管理器
class InteractiveChukuangManager {
    constructor() {
        this.interactiveQueue = [];
        this.isProcessing = false;
        this.cardResponseRules = this.initCardResponseRules();
        this.playerInteractions = new Map();
        this.cooldownTimers = new Map();
        this.reactionChains = [];
    }

    initCardResponseRules() {
        return {
            // 杀类卡牌的响应
            'sha': {
                triggers: ['GongJi', 'TeShu'],
                probability: 0.8,
                delay: [300, 800],
                conditions: ['isTarget', 'isAdjacent']
            },
            
            // 闪避类卡牌的响应
            'shan': {
                triggers: ['hudong', 'TeShu'],
                probability: 0.7,
                delay: [200, 600],
                conditions: ['isTarget']
            },
            
            // 技能类卡牌的响应
            'skill': {
                triggers: ['TeShu', 'hudong'],
                probability: 0.9,
                delay: [400, 1000],
                conditions: ['isInRange', 'hasRelation']
            },
            
            // 治疗类卡牌的响应
            'peach': {
                triggers: ['hudong', 'chuchang'],
                probability: 0.6,
                delay: [300, 700],
                conditions: ['isTarget', 'isFriend']
            },
            
            // 装备类卡牌的响应
            'equipment': {
                triggers: ['chuchang', 'TeShu'],
                probability: 0.5,
                delay: [500, 1200],
                conditions: ['isVisible']
            },
            
            // 锦囊类卡牌的响应
            'trick': {
                triggers: ['TeShu', 'GongJi'],
                probability: 0.8,
                delay: [400, 900],
                conditions: ['isTarget', 'isInRange']
            }
        };
    }

    processInteractiveAction(data) {
        const action = data.data || data;
        
        if (action.source === 'card-response') {
            this.handleCardResponse(action);
        } else if (action.source === 'chain-reaction') {
            this.handleChainReaction(action);
        } else {
            this.handleDirectAction(action);
        }
    }

    handleCardResponse(action) {
        const cardInfo = action.cardInfo;
        if (!cardInfo) return;

        // 检查是否应该响应这张卡牌
        if (this.shouldRespondToCard(cardInfo)) {
            const responseAction = this.selectResponseAction(cardInfo);
            if (responseAction) {
                this.queueInteractiveAction(responseAction, cardInfo);
            }
        }
    }

    shouldRespondToCard(cardInfo) {
        // 检查冷却时间
        const playerId = cardInfo.player;
        const now = Date.now();
        
        if (this.cooldownTimers.has(playerId)) {
            const lastTime = this.cooldownTimers.get(playerId);
            if (now - lastTime < 2000) { // 2秒冷却
                return false;
            }
        }

        // 检查响应规则
        const cardType = this.getCardType(cardInfo);
        const rules = this.cardResponseRules[cardType];
        
        if (!rules) return false;

        // 概率检查
        if (Math.random() > rules.probability) {
            return false;
        }

        // 条件检查
        return this.checkResponseConditions(cardInfo, rules.conditions);
    }

    getCardType(cardInfo) {
        // 从卡牌信息中提取类型
        const type = cardInfo.type?.toLowerCase();
        const category = cardInfo.category?.toLowerCase();
        
        // 映射具体卡牌名到类型
        const cardTypeMap = {
            'sha': 'sha',
            'kill': 'sha',
            'attack': 'sha',
            'dodge': 'shan',
            'shan': 'shan',
            'peach': 'peach',
            'heal': 'peach',
            'wine': 'peach',
            'equipment': 'equipment',
            'weapon': 'equipment',
            'armor': 'equipment',
            'horse': 'equipment',
            'treasure': 'equipment'
        };

        return cardTypeMap[type] || cardTypeMap[category] || category || 'trick';
    }

    checkResponseConditions(cardInfo, conditions) {
        // 检查响应条件
        for (const condition of conditions) {
            if (!this.evaluateCondition(cardInfo, condition)) {
                return false;
            }
        }
        return true;
    }

    evaluateCondition(cardInfo, condition) {
        switch (condition) {
            case 'isTarget':
                return this.isTarget(cardInfo);
            case 'isAdjacent':
                return this.isAdjacent(cardInfo);
            case 'isInRange':
                return this.isInRange(cardInfo);
            case 'hasRelation':
                return this.hasRelation(cardInfo);
            case 'isFriend':
                return this.isFriend(cardInfo);
            case 'isVisible':
                return true; // 默认可见
            default:
                return true;
        }
    }

    isTarget(cardInfo) {
        // 检查是否是目标玩家
        return cardInfo.target === 'self' || 
               cardInfo.targets?.includes('self') ||
               Math.random() > 0.3; // 30%概率非目标也响应
    }

    isAdjacent(cardInfo) {
        // 检查是否是相邻玩家
        // 这里需要游戏逻辑判断，暂时用随机
        return Math.random() > 0.5;
    }

    isInRange(cardInfo) {
        // 检查是否在影响范围内
        return Math.random() > 0.4;
    }

    hasRelation(cardInfo) {
        // 检查是否有关系（同势力等）
        return Math.random() > 0.6;
    }

    isFriend(cardInfo) {
        // 检查是否是友方
        return Math.random() > 0.5;
    }

    selectResponseAction(cardInfo) {
        const cardType = this.getCardType(cardInfo);
        const rules = this.cardResponseRules[cardType];
        
        if (!rules || !rules.triggers.length) {
            return null;
        }

        // 随机选择一个触发动作
        const action = rules.triggers[Math.floor(Math.random() * rules.triggers.length)];
        
        // 计算延迟
        const [minDelay, maxDelay] = rules.delay;
        const delay = minDelay + Math.random() * (maxDelay - minDelay);

        return {
            action: action,
            delay: delay,
            cardInfo: cardInfo,
            responseType: cardType
        };
    }

    queueInteractiveAction(responseAction, cardInfo) {
        this.interactiveQueue.push({
            ...responseAction,
            timestamp: Date.now(),
            id: this.generateActionId()
        });

        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.isProcessing || this.interactiveQueue.length === 0) {
            return;
        }

        this.isProcessing = true;

        while (this.interactiveQueue.length > 0) {
            const actionItem = this.interactiveQueue.shift();
            await this.executeInteractiveAction(actionItem);
            
            // 设置冷却时间
            if (actionItem.cardInfo?.player) {
                this.cooldownTimers.set(actionItem.cardInfo.player, Date.now());
            }
            
            // 可能触发连锁反应
            this.checkChainReaction(actionItem);
        }

        this.isProcessing = false;
    }

    async executeInteractiveAction(actionItem) {
        // 延迟执行
        await this.delay(actionItem.delay);

        // 构造出框数据
        const chukuangData = {
            action: actionItem.action,
            id: actionItem.id,
            skinId: this.getCurrentSkinId(),
            source: 'interactive',
            cardResponse: actionItem.responseType,
            speed: 1.0 + (Math.random() - 0.5) * 0.4, // 随机速度变化
            isInteractive: true
        };

        // 调用原有的出框播放逻辑
        if (typeof playerAnimation !== 'undefined') {
            try {
                await this.playInteractiveChukuang(chukuangData);
            } catch (error) {
                console.error('互动出框播放失败:', error);
            }
        }

        // 发送完成消息
        postMessage({
            type: 'interactive-action-complete',
            data: {
                actionId: actionItem.id,
                action: actionItem.action,
                success: true
            }
        });
    }

    async playInteractiveChukuang(data) {
        // 增强的出框播放，支持互动特效
        if (!playerAnimation) {
            throw new Error('playerAnimation未初始化');
        }

        // 为互动动作添加特殊效果
        const enhancedData = this.enhanceInteractiveData(data);
        
        // 调用原有播放逻辑
        playerAnimation.playAction(enhancedData);
        
        // 添加互动特效
        this.addInteractiveEffects(enhancedData);
    }

    enhanceInteractiveData(data) {
        const enhanced = { ...data };
        
        // 根据卡牌响应类型调整效果
        switch (data.cardResponse) {
            case 'sha':
                enhanced.intensity = 'high';
                enhanced.effects = ['flash', 'shake'];
                break;
            case 'shan':
                enhanced.intensity = 'medium';
                enhanced.effects = ['dodge', 'fade'];
                break;
            case 'skill':
                enhanced.intensity = 'high';
                enhanced.effects = ['glow', 'particles'];
                break;
            case 'peach':
                enhanced.intensity = 'low';
                enhanced.effects = ['heal', 'sparkle'];
                break;
            default:
                enhanced.intensity = 'medium';
                enhanced.effects = ['normal'];
        }

        return enhanced;
    }

    addInteractiveEffects(data) {
        // 添加互动特效
        if (data.effects?.includes('flash')) {
            this.addFlashEffect();
        }
        
        if (data.effects?.includes('particles')) {
            this.addParticleEffect();
        }
        
        if (data.effects?.includes('glow')) {
            this.addGlowEffect();
        }
    }

    addFlashEffect() {
        // 添加闪光效果
        postMessage({
            type: 'add-effect',
            effect: 'flash',
            duration: 300
        });
    }

    addParticleEffect() {
        // 添加粒子效果
        postMessage({
            type: 'add-effect',
            effect: 'particles',
            duration: 1500
        });
    }

    addGlowEffect() {
        // 添加发光效果
        postMessage({
            type: 'add-effect',
            effect: 'glow',
            duration: 800
        });
    }

    checkChainReaction(actionItem) {
        // 检查是否应该触发连锁反应
        const chainProbability = this.getChainProbability(actionItem);
        
        if (Math.random() < chainProbability) {
            this.triggerChainReaction(actionItem);
        }
    }

    getChainProbability(actionItem) {
        // 根据动作类型和响应类型计算连锁概率
        const baseProbability = 0.2;
        const typeMultiplier = {
            'GongJi': 1.5,
            'TeShu': 1.8,
            'hudong': 1.0,
            'chuchang': 0.8
        };
        
        return baseProbability * (typeMultiplier[actionItem.action] || 1.0);
    }

    triggerChainReaction(originalAction) {
        // 生成连锁反应
        const chainActions = this.generateChainActions(originalAction);
        
        chainActions.forEach((chainAction, index) => {
            setTimeout(() => {
                this.queueInteractiveAction(chainAction, originalAction.cardInfo);
            }, (index + 1) * 500); // 错开时间
        });
    }

    generateChainActions(originalAction) {
        const chainCount = 1 + Math.floor(Math.random() * 3); // 1-3个连锁
        const actions = ['GongJi', 'TeShu', 'hudong'];
        const chainActions = [];
        
        for (let i = 0; i < chainCount; i++) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            chainActions.push({
                action: action,
                delay: 200 + Math.random() * 400,
                cardInfo: originalAction.cardInfo,
                responseType: 'chain',
                chainIndex: i
            });
        }
        
        return chainActions;
    }

    handleChainReaction(action) {
        // 处理连锁反应
        this.queueInteractiveAction(action, action.cardInfo);
    }

    handleDirectAction(action) {
        // 处理直接动作（手势、按钮等触发）
        const directData = {
            action: action.action,
            id: this.generateActionId(),
            skinId: this.getCurrentSkinId(),
            source: action.source,
            speed: action.speed || 1.0,
            loop: action.loop || false,
            isInteractive: true
        };

        // 立即执行
        this.executeInteractiveAction({
            ...directData,
            delay: 0
        });
    }

    getCurrentSkinId() {
        // 获取当前皮肤ID，这里需要与主系统同步
        return chukuangId++;
    }

    generateActionId() {
        return 'interactive_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 清理资源
    cleanup() {
        this.interactiveQueue = [];
        this.cooldownTimers.clear();
        this.playerInteractions.clear();
        this.reactionChains = [];
        this.isProcessing = false;
    }
}

// 创建互动管理器实例
const interactiveManager = new InteractiveChukuangManager();

// 监听来自主线程的消息
addEventListener('message', function(e) {
    const { type, data } = e.data;
    
    switch (type) {
        case 'interactive-action':
            interactiveManager.processInteractiveAction(data);
            break;
            
        case 'card-event':
            // 处理卡牌事件
            interactiveManager.handleCardResponse({ 
                cardInfo: data,
                source: 'card-response'
            });
            break;
            
        case 'chain-reaction':
            interactiveManager.handleChainReaction(data);
            break;
            
        case 'cleanup':
            interactiveManager.cleanup();
            break;
            
        default:
            // 将其他消息传递给原有的worker处理
            if (typeof chukuangStart === 'function') {
                try {
                    chukuangStart(e.data);
                } catch (error) {
                    console.warn('原有worker处理失败:', error);
                }
            }
            break;
    }
});

// 导出互动管理器（供其他模块使用）
self.interactiveManager = interactiveManager; 