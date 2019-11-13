export function fieldSort(field){
  return (a, b) => a[field].localeCompare(b[field]);
}
