// @author 吴志强
// @date 2021/10/6

const toFunction = (BaseComponent, mapPropsToComponent?) => (props) => {
    if (mapPropsToComponent) {
        return <BaseComponent {...mapPropsToComponent(props)}/>;
    } else {
        return <BaseComponent/>;
    }
};

export default toFunction;
