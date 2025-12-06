export abstract class Base {
  cwd: string;

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd;
  }

  runCmd() {}
}
