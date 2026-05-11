export default function SiteVersionSelect({ value, onChange }) {
  return (
    <div className="control-group">
      <label htmlFor="ui-version-select">Site version</label>
      <select
        id="ui-version-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Switch site version"
      >
        <option value="v1">V1</option>
        <option value="v2">V2</option>
        <option value="v3">V3</option>
        <option value="v3.1">V3.1 (watercolor)</option>
        <option value="v3.2">V3.2</option>
        <option value="v4">V4 (broken)</option>
      </select>
    </div>
  )
}
