import { Facade } from "./core/mvc/Facade";
import BaseModel from "./core/mvc/base/BaseModel";
import CommandManager from "./core/mvc/manager/CommandManager";
import LoadLayersCmd from "./mvc_ex/command/LoadLayersCmd";

/**
 * 框架煮类，用户初始化框架以及提供一些框架级别的接口。
 * @author ituuz
 */
export default class Framework {

    /**
     * 初始化框架接口
     * @param {MVC_struct} scene 初始化游戏的第一个场景
     * @param {boolean} debug 框架是否是调试模式
     * @param {cc.Size} designResolution 默认的设计分辨率
     * @param {boolean} fitWidth 是否宽适配
     * @param {boolean} fitHeight 是否高适配
     */
    public static start(
            scene: MVC_struct,
            models: {new (): BaseModel}[],
            debug: boolean = true, 
            designResolution: cc.Size = cc.size(960, 640), 
            fitWidth: boolean = false, 
            fitHeight: boolean = false
        ): void {
        Facade.getInstance().init(debug, designResolution, fitWidth, fitHeight);
        Framework.registerModels(models);
        // 运行第一个场景
        CommandManager.getInstance().__executeCommand__(LoadLayersCmd, {mvc: scene, data: null});
    }

    /**
     * 注册数据model
     * @param {{new (): BaseModel}} model
     */
    private static registerModels(models: {new (): BaseModel}[]): void {
        for (let model of models) {
            Facade.getInstance().registerModel(model);
        }
    }

    /**
     * 获取model对象
     * @param {{new (): BaseModel}} model
     */
    public static getModel<T extends BaseModel>(model: {new (): T}): T {
        return Facade.getInstance().getModel(model);
    }
}

/**
 * 一个场景或者UI层的配置结构
 */
export class MVC_struct {
    public viewClass: string;
    public medClass: string;
    public children: MVC_struct[];
}

// 将接口导出
(<any>window).it || ((<any>window).it = {});
(<any>window).it.Framework = Framework;

