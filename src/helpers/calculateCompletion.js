export default function(target, completion) {
  return Math.round((completion / target) * 100);
}
