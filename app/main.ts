import * as fs from 'fs';
import zlib from 'zlib';

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
    Init = "init",
    Catfile = "cat-file",
}

switch (command) {
    case Commands.Init:
        // You can use print statements as follows for debugging, they'll be visible when running tests.
        console.log("Logs from your program will appear here!");

        // Uncomment this block to pass the first stage
        fs.mkdirSync(".git", { recursive: true });
        fs.mkdirSync(".git/objects", { recursive: true });
        fs.mkdirSync(".git/refs", { recursive: true });
        fs.writeFileSync(".git/HEAD", "ref: refs/heads/main\n");
        console.log("Initialized git directory");
        break;
    case Commands.Catfile:
        const blobhash = args[1] === '-p' ? args[2] : '';
        if (blobhash) {
            const blobdir = args[2].substring(0, 2);
            const blobfile = args[2].substring(2);
            const blob = fs.readFileSync(`.git/objects/${blobdir}/${blobfile}`)
            //returns the content of the path
            const decompressedBuffer = zlib.unzipSync(new Uint8Array(blob));
            const stringdata = decompressedBuffer.toString().split('\0')[1];
            //split method returns an array taking input string and takes the second part of the array.
            process.stdout.write(stringdata);
        }
        break;
    default:
        throw new Error(`Unknown command ${command}`);
}
