import { useState } from 'react'
import {
  Car,
  Clock,
  Database,
  UserCheck,
  Wrench,
  Zap,
} from 'lucide-react'

const VEHICLES = [
  { id: 'v1', name: 'Hyundai Creta SX(O)', reg: 'KL-14-AK-4455', odo: '28,450 km' },
  { id: 'v2', name: 'Toyota Fortuner 4x4', reg: 'KL-14-M-8899', odo: '42,120 km' },
  { id: 'v3', name: 'Honda City i-VTEC', reg: 'KL-14-R-2024', odo: '18,300 km' },
]

const SERVICES = [
  { id: 's1', title: 'Periodic Maintenance Service', cost: '₹ 4,850', duration: '3.5 Hours' },
  { id: 's2', title: 'Engine Oil & Synthetic Filter Flush', cost: '₹ 2,400', duration: '1.5 Hours' },
  { id: 's3', title: 'Complete OBD-II ECU Diagnostics', cost: '₹ 1,800', duration: '1.0 Hour' },
]

const STAGES = [
  { step: '01', title: 'Booking Confirmed', done: true },
  { step: '02', title: 'Bay 03 Inspection', done: true },
  { step: '03', title: 'Parts & Fluid Service', active: true },
  { step: '04', title: 'Final QC & Wash', done: false },
]

export function VehicleServiceSimulator() {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0])
  const [selectedService, setSelectedService] = useState(SERVICES[0])

  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-500/30 bg-surface/90 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300">
            System Status: Completed &amp; Production Ready
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-mist/80">
          <span className="rounded bg-black/40 px-2 py-0.5 border border-white/5 flex items-center gap-1.5">
            <Database className="h-3 w-3 text-cyan-400" />
            PostgreSQL DB Connected
          </span>
          <span className="rounded bg-indigo-950/40 px-2 py-0.5 text-indigo-300 border border-indigo-400/20">
            Job #SRV-9421
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-5">
        {/* Vehicle Selector Pills */}
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wider text-mist/70 mb-2">
            Select Customer Vehicle:
          </span>
          <div className="grid gap-2 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v)}
                className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                  selectedVehicle.id === v.id
                    ? 'border-indigo-400/60 bg-indigo-950/30 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                }`}
              >
                <Car className="mt-0.5 h-4 w-4 text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block truncate text-xs font-bold text-cloud">{v.name}</span>
                  <span className="block font-mono text-[10px] text-cyan-300">{v.reg}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Service Package Chooser */}
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-wider text-mist/70 mb-2">
            Requested Service Package:
          </span>
          <div className="space-y-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s)}
                className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                  selectedService.id === s.id
                    ? 'border-cyan-400/50 bg-cyan-950/25 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-medium text-cloud">{s.title}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-mist/70 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {s.duration}
                  </span>
                  <span className="font-bold text-emerald-400">{s.cost}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Service Job Progress Tracker */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              Live Workshop Bay Tracker:
            </span>
            <span className="font-mono text-[10px] text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-400/30">
              Active In Bay #03
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STAGES.map((stage) => (
              <div
                key={stage.step}
                className={`rounded-lg border p-2 text-center transition-all ${
                  stage.done
                    ? 'border-emerald-400/40 bg-emerald-950/20 text-emerald-300'
                    : stage.active
                    ? 'border-cyan-400/60 bg-cyan-950/40 text-cyan-200 animate-pulse'
                    : 'border-white/5 bg-white/[0.02] text-mist/60'
                }`}
              >
                <span className="block font-mono text-[10px] font-bold">STAGE {stage.step}</span>
                <span className="block text-[11px] font-semibold mt-0.5 truncate">{stage.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-mist">
            <span className="flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
              Assigned Tech: Rajesh M. (Senior Specialist)
            </span>
            <span className="text-cyan-300">Est. Completion: 4:30 PM Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
