
var IProcess = function(){};
IProcess.prototype.OnUpdate = function(fDeltaTime){};
IProcess.prototype.Stop = function(){};
IProcess.prototype.Success = function(){};
IProcess.prototype.Fail = function(){};



var ProcessManager = function(){
    this.processes = [];
    
};

ProcessManager.prototype.AttachProcess = function(process){
    this.processes.push(process);
};

ProcessManager.prototype.Update = function(fDeltaTime){
    
    //some loop for update each process attached
    for(var i; i < this.processes.length; i++){
        this.processes[i].OnUpdate(fDeltaTime);
    }
    
};