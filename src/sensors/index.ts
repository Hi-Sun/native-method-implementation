/**
 * @description 二次封装神策 SDK，只提取需要的方法：track login ObserveIntersection
 */

import sensorsdata from './sensorsdata.es6.min';
import { Cookies } from 'react-cookie';

const eventName = 'sensors-event-ch';
const TYCID = 'TYCID';

/**
 * @description 上报自定义事件
 * @param {string} ch         eventId?key1=value1&key2=value2
 * @param {string} eventId    埋点事件
 * @param {string} key        参数
 * @param {string} value      key对应的值
 * */
const autoTractClick = function (ch: string) {
  const eventId = ch.split('?')[0];
  const eventStr = ch.split('?')[1];
  const eventArg: any = {};
  eventStr.split('&').forEach((item) => {
    const arg = item.split('=');
    eventArg[arg[0]] = arg[1];
  });
  if (eventId && Object.keys(eventArg).length) {
    sensors.track(eventId, eventArg);
  }
};

/**
 * @description 曝光埋点 由于神策自带$WebStay事件不支持自定义属性，故使用WEB-API：Intersection Observer
 * @param {string} selector         css 选择器
 * @param {string} 'sensors-observe'eventId?key1=value1&key2=value2
 * @param {string} eventId          埋点事件
 * @param {string} key              参数
 * @param {string} value            key对应的值
 * */
const onIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      const ch = entry.target?.getAttribute('sensors-observe');
      if (ch) {
        autoTractClick(ch);
      }
    }
  });
};

let observer: any = null;
if (typeof IntersectionObserver !== 'undefined') {
  observer = new IntersectionObserver(onIntersection);
}

// js 埋点上报自定义事件
const sensorsListener = (ev: MouseEvent) => {
  const $this = ev.target as HTMLElement;
  const ch = $this.getAttribute(eventName);
  if (ch) {
    autoTractClick(ch);
  } else {
    let { parentNode } = $this;
    let parentCh = (parentNode as HTMLElement)?.getAttribute?.(eventName);
    while (parentNode) {
      if (parentNode?.nodeName?.toLowerCase?.() === 'body') {
        return;
      }
      if (parentCh) {
        autoTractClick(parentCh);
        return;
      }
      parentNode = parentNode.parentNode;
      parentCh = (parentNode as HTMLElement)?.getAttribute?.(eventName);
    }
  }
};
window.removeEventListener('click', sensorsListener);
window.addEventListener('click', sensorsListener, true);

const sensorsInit = () => {
  // 初始化
  sensorsdata.init({
    server_url: window.sensorsServerUrl,
    show_log: window.sensorsDebug,
    is_track_single_page: true,
    heatmap: {
      clickmap: 'default',
      scroll_notice_map: 'not_collect',
    },
    app_js_bridge: true,
  });

  // 注册公共属性
  const cookies = new Cookies();
  const tycid = cookies.get(TYCID) || null;
  const device_uuid = tycid;
  sensorsdata.registerPage({
    current_url: window.location.href,
    referrer: document.referrer,
    tycid,
    device_uuid,
  });
};

const sensors: any = {};

sensors.login = (uid: string) => {
  sensorsdata.login(uid);
};

sensors.track = (eventId: string, eventArg: any) => {
  sensorsdata.track(eventId, eventArg);
};

sensors.quick = (eventId: string, eventArg: any) => {
  sensorsdata.quick(eventId, eventArg);
};

sensors.ObserveIntersection = (selector: string) => {
  if (observer && observer.observe && typeof observer.observe === 'function') {
    const elArr = Array.prototype.slice.call(document.querySelectorAll(selector) || []);
    elArr.forEach((el) => {
      observer.unobserve(el);
      observer.observe(el);
    });
  }
};

export default sensors;
export { sensorsInit };
