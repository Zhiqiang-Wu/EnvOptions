**@author 吴志强**

**@date 2021/10/19**

```ts
import {compose} from 'recompose';

export default compose(
    hoc1, hoc2, hoc3
)(BaseComponent);
```
等价于
```ts
export default hoc1(hoc2(hoc3(BaseComponent)));
```

需要注意compose中高阶组件的执行顺序，有些高阶组件需要放在指定位置才有效，比如[keepAlive](../../src/components/keep-alive/index.tsx)(用于保存组件状态的高阶组件)

1. 因为keepAlive先执行，所以无法保存hoc1、hoc2、hoc3中定义的状态，只能保存BaseComponent中定义的状态
```ts
import {compose} from 'recompose';
import keepAlive from './index';

export default compose(
    hoc1, hoc2, hoc3, keepAlive(),
)(BaseComponent);
```
2. 可以保存hoc2、hoc3、BaseComponent中定义的状态，无法保存hoc1中定义的状态，因为比hoc1先执行
```ts
import {compose} from 'recompose';
import keepAlive from './index';

export default compose(
    hoc1, keepAlive(), hoc2, hoc3, 
)(BaseComponent);
```
