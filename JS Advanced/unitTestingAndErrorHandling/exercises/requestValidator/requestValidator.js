function validator(obj) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

    //.method
    if (methods.includes(obj.method) == false) {
        throw new Error('Invalid request header: Invalid Method');
    }

    //.uri

    if (/^([A-Za-z0-9\.]+)$|^\*$/gm.test(obj.uri) == false) {
        throw new Error('Invalid request header: Invalid URI');
    }

    //.version
    if ((versions.includes(obj.version)) == false) {
        throw new Error('Invalid request header: Invalid Version');
    }

    //message
    if (/[<>\&\\'\"]/gm.test(obj.messsage)) {
        throw new Error('Invalid request header: Invalid Message');
    }

    return obj;
}

export default validator;