import "./gang.css";

interface GangProps {
    nodeId:number;
    name:String;
    location:String;
    totalEpid:number;
}

 function Gang(props: GangProps): JSX.Element {
    return (
        <div className="gang1 Box">
        nodeId:{props.nodeId} <br/>name:{props.name} <br/>location:{props.location}<hr/>
        {[...Array(props.totalEpid)].map(index=><><input key={index} type="text"/><br/></>)}
        <input type="text"/><br/>
        <input type="submit" value="send"/>
    </div>
    );
}
export default Gang